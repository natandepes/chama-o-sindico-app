export interface ServiceComment {
    id?: string;
    condominalServiceId: string;
    comment: string;
    createdAt: Date;
    commentByUserId?: string;
    commentByUserName?: string;
}