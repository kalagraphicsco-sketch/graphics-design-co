import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface ContactSubmission {
    id: bigint;
    subject: string;
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
}
export interface PortfolioItem {
    id: string;
    title: string;
    featured: boolean;
    description: string;
    imageUrl: ExternalBlob;
    category: Category;
}
export interface TeamMember {
    id: string;
    bio: string;
    name: string;
    role: string;
    imageUrl: ExternalBlob;
}
export interface Service {
    id: bigint;
    title: string;
    icon: string;
    description: string;
}
export interface UserProfile {
    name: string;
}
export interface Testimonial {
    id: bigint;
    name: string;
    role: string;
    quote: string;
    company: string;
    rating: bigint;
}
export enum Category {
    digitalGraphics = "digitalGraphics",
    logoDesign = "logoDesign",
    printMedia = "printMedia",
    uiuxDesign = "uiuxDesign",
    motionGraphics = "motionGraphics",
    branding = "branding"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addPortfolioItem(id: string, title: string, category: Category, description: string, imageUrl: ExternalBlob, featured: boolean): Promise<void>;
    addService(title: string, description: string, icon: string): Promise<void>;
    addTeamMember(id: string, name: string, role: string, bio: string, imageUrl: ExternalBlob): Promise<void>;
    addTestimonial(name: string, role: string, company: string, quote: string, rating: bigint): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deletePortfolioItem(id: string): Promise<void>;
    deleteService(id: bigint): Promise<void>;
    deleteTeamMember(id: string): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getContactSubmissions(): Promise<Array<ContactSubmission>>;
    getFeaturedPortfolioItems(): Promise<Array<PortfolioItem>>;
    getPortfolioItems(): Promise<Array<PortfolioItem>>;
    getPortfolioItemsByCategory(category: Category): Promise<Array<PortfolioItem>>;
    getServices(): Promise<Array<Service>>;
    getTeamMembers(): Promise<Array<TeamMember>>;
    getTestimonials(): Promise<Array<Testimonial>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    removeTestimonial(id: bigint): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitContactForm(name: string, email: string, subject: string, message: string): Promise<void>;
    updatePortfolioItem(id: string, title: string, category: Category, description: string, imageUrl: ExternalBlob, featured: boolean): Promise<void>;
    updateService(id: bigint, title: string, description: string, icon: string): Promise<void>;
    updateTeamMember(id: string, name: string, role: string, bio: string, imageUrl: ExternalBlob): Promise<void>;
}
