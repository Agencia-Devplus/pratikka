import { AngularFirestore, AngularFirestoreCollection, QueryFn } from '@angular/fire/firestore';

export abstract class Firestore<T extends { perfil: string }> {
    protected collection: AngularFirestoreCollection<T>;

    constructor(protected db: AngularFirestore) { }

    protected setCollection(path: string, queryFn?: QueryFn): void {
        this.collection = path ? this.db.collection(path, queryFn) : null;
    }

    private setItem(item: T, operation: string): Promise<T> {
        return this.collection
            .doc<T>(item.perfil)
        [operation](item)
            .then(() => item);
    }

    create(item: T): Promise<T> {
        item.perfil;
        return this.setItem(item, 'set');
    }
}
