import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";
import AccessControl "authorization/access-control";
import Storage "blob-storage/Storage";

actor {
  type Category = {
    #logoDesign;
    #branding;
    #printMedia;
    #digitalGraphics;
    #uiuxDesign;
    #motionGraphics;
  };

  public type PortfolioItem = {
    id : Text;
    title : Text;
    category : Category;
    description : Text;
    imageUrl : Storage.ExternalBlob;
    featured : Bool;
  };

  public type Testimonial = {
    id : Nat;
    name : Text;
    role : Text;
    company : Text;
    quote : Text;
    rating : Nat;
  };

  public type ContactSubmission = {
    id : Nat;
    name : Text;
    email : Text;
    subject : Text;
    message : Text;
    timestamp : Int;
  };

  public type TeamMember = {
    id : Text;
    name : Text;
    role : Text;
    bio : Text;
    imageUrl : Storage.ExternalBlob;
  };

  public type Service = {
    id : Nat;
    title : Text;
    description : Text;
    icon : Text;
  };

  public type UserProfile = {
    name : Text;
  };

  module PortfolioItem {
    public func compare(item1 : PortfolioItem, item2 : PortfolioItem) : Order.Order {
      Text.compare(item1.id, item2.id);
    };
  };

  module Testimonial {
    public func compare(test1 : Testimonial, test2 : Testimonial) : Order.Order {
      Nat.compare(test1.id, test2.id);
    };
  };

  module ContactSubmission {
    public func compare(sub1 : ContactSubmission, sub2 : ContactSubmission) : Order.Order {
      Nat.compare(sub1.id, sub2.id);
    };
  };

  module TeamMember {
    public func compare(member1 : TeamMember, member2 : TeamMember) : Order.Order {
      Text.compare(member1.id, member2.id);
    };
  };

  module Service {
    public func compare(service1 : Service, service2 : Service) : Order.Order {
      Nat.compare(service1.id, service2.id);
    };
  };

  let portfolioItems = Map.empty<Text, PortfolioItem>();
  let testimonials = Map.empty<Nat, Testimonial>();
  let contactSubmissions = Map.empty<Nat, ContactSubmission>();
  let teamMembers = Map.empty<Text, TeamMember>();
  let services = Map.empty<Nat, Service>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  let accessControlState = AccessControl.initState();

  include MixinAuthorization(accessControlState);
  include MixinStorage();

  var testimonialCounter = 1;
  var contactCounter = 1;
  var serviceCounter = 1;

  // User Profile Functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Portfolio Items
  public shared ({ caller }) func addPortfolioItem(
    id : Text,
    title : Text,
    category : Category,
    description : Text,
    imageUrl : Storage.ExternalBlob,
    featured : Bool,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add portfolio items");
    };
    let item : PortfolioItem = {
      id;
      title;
      category;
      description;
      imageUrl;
      featured;
    };
    portfolioItems.add(id, item);
  };

  public shared ({ caller }) func updatePortfolioItem(
    id : Text,
    title : Text,
    category : Category,
    description : Text,
    imageUrl : Storage.ExternalBlob,
    featured : Bool,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update portfolio items");
    };
    switch (portfolioItems.get(id)) {
      case (null) { Runtime.trap("Portfolio item not found") };
      case (?_) {
        let updatedItem : PortfolioItem = {
          id;
          title;
          category;
          description;
          imageUrl;
          featured;
        };
        portfolioItems.add(id, updatedItem);
      };
    };
  };

  public shared ({ caller }) func deletePortfolioItem(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete portfolio items");
    };
    if (not portfolioItems.containsKey(id)) {
      Runtime.trap("Portfolio item not found");
    };
    portfolioItems.remove(id);
  };

  public query func getPortfolioItems() : async [PortfolioItem] {
    portfolioItems.values().toArray().sort();
  };

  public query func getFeaturedPortfolioItems() : async [PortfolioItem] {
    let featured = portfolioItems.values().filter(func(item) { item.featured });
    featured.toArray().sort();
  };

  public query func getPortfolioItemsByCategory(category : Category) : async [PortfolioItem] {
    let filtered = portfolioItems.values().filter(func(item) { item.category == category });
    filtered.toArray().sort();
  };

  // Testimonials
  public shared ({ caller }) func addTestimonial(
    name : Text,
    role : Text,
    company : Text,
    quote : Text,
    rating : Nat,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add testimonials");
    };
    let testimonial : Testimonial = {
      id = testimonialCounter;
      name;
      role;
      company;
      quote;
      rating;
    };
    testimonials.add(testimonialCounter, testimonial);
    testimonialCounter += 1;
  };

  public shared ({ caller }) func removeTestimonial(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can remove testimonials");
    };
    if (not testimonials.containsKey(id)) {
      Runtime.trap("Testimonial not found");
    };
    testimonials.remove(id);
  };

  public query func getTestimonials() : async [Testimonial] {
    testimonials.values().toArray().sort();
  };

  // Contact Form Submissions
  public shared ({ caller }) func submitContactForm(
    name : Text,
    email : Text,
    subject : Text,
    message : Text,
  ) : async () {
    // Public access - no authorization check needed (guests can submit)
    let submission : ContactSubmission = {
      id = contactCounter;
      name;
      email;
      subject;
      message;
      timestamp = Time.now();
    };
    contactSubmissions.add(contactCounter, submission);
    contactCounter += 1;
  };

  public query ({ caller }) func getContactSubmissions() : async [ContactSubmission] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view contact submissions");
    };
    contactSubmissions.values().toArray().sort();
  };

  // Team Members
  public shared ({ caller }) func addTeamMember(
    id : Text,
    name : Text,
    role : Text,
    bio : Text,
    imageUrl : Storage.ExternalBlob,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add team members");
    };
    let member : TeamMember = {
      id;
      name;
      role;
      bio;
      imageUrl;
    };
    teamMembers.add(id, member);
  };

  public shared ({ caller }) func updateTeamMember(
    id : Text,
    name : Text,
    role : Text,
    bio : Text,
    imageUrl : Storage.ExternalBlob,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update team members");
    };
    switch (teamMembers.get(id)) {
      case (null) { Runtime.trap("Team member not found") };
      case (?_) {
        let updatedMember : TeamMember = {
          id;
          name;
          role;
          bio;
          imageUrl;
        };
        teamMembers.add(id, updatedMember);
      };
    };
  };

  public shared ({ caller }) func deleteTeamMember(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete team members");
    };
    if (not teamMembers.containsKey(id)) {
      Runtime.trap("Team member not found");
    };
    teamMembers.remove(id);
  };

  public query func getTeamMembers() : async [TeamMember] {
    teamMembers.values().toArray().sort();
  };

  // Services
  public shared ({ caller }) func addService(title : Text, description : Text, icon : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add services");
    };
    let service : Service = {
      id = serviceCounter;
      title;
      description;
      icon;
    };
    services.add(serviceCounter, service);
    serviceCounter += 1;
  };

  public shared ({ caller }) func updateService(id : Nat, title : Text, description : Text, icon : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update services");
    };
    switch (services.get(id)) {
      case (null) { Runtime.trap("Service not found") };
      case (?_) {
        let updatedService : Service = {
          id;
          title;
          description;
          icon;
        };
        services.add(id, updatedService);
      };
    };
  };

  public shared ({ caller }) func deleteService(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete services");
    };
    if (not services.containsKey(id)) {
      Runtime.trap("Service not found");
    };
    services.remove(id);
  };

  public query func getServices() : async [Service] {
    services.values().toArray().sort();
  };
};
