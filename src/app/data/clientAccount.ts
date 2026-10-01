import {HistoryEntry, Subscription} from "@/app/types/marketplace.ts";

export class ClientAccount {
    private id: string;
    private subbscriptions: Subscription[];
    private history: HistoryEntry[];
    private displayName: string;
    private createdAt: Date;
    private updatedAt: Date;
}