import { inject, Injectable, OnDestroy } from '@angular/core';
import { Firestore, collection, addDoc, doc, updateDoc, onSnapshot, deleteDoc, query, limit, where } from '@angular/fire/firestore'
import { QuerySnapshot, DocumentData, CollectionReference } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FirestoreService implements OnDestroy {
  private readonly firestore: Firestore = inject(Firestore);

  public gameList$ = new BehaviorSubject<object[]>([]);

  //private unSnapGameList: () => void;
  private unSnapSingleGameList: () => void = () => { };

  constructor() {
  }

  /**
   * Initialisiert das Abonnement für ein einzelnes Spiel.
   * @param paramId Die Dokument-ID des Spiels.
   */
  public init(paramId: string): void {
    this.unSnapSingleGameList = this.onSnapSingleGame('games', paramId);
  }

  /**
   * Beendet aktive Snapshot-Listener beim Zerstören des Services.
   */
  public ngOnDestroy(): void {
    this.unSnapSingleGameList();
  }

  /**
   * Fügt ein neues Dokument zur angegebenen Collection hinzu.
   * @param doc Die Spieldaten im JSON-Format.
   * @returns Eine Promise mit der ID des neu erstellten Dokuments.
   */
  public async addDocList(doc: JSON): Promise<any> {
    try {
      const result = await addDoc(this.getCollectionRef('games'), doc);
      return result.id;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Aktualisiert ein bestehendes Dokument in Firestore.
   * @param ref Der Name der Collection.
   * @param docId Die ID des zu aktualisierenden Dokuments.
   * @param doc Die neuen Daten.
   */
  public async updateDoc(ref: string, docId: string, doc: any) {
    try {
      await updateDoc(this.getSingleDocRef(ref, docId), doc);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Aktiviert einen Snapshot-Listener für ein einzelnes Spiel.
   * @param ref Der Name der Collection (z. B. 'games').
   * @param docId Die ID des zu beobachtenden Dokuments.
   * @returns Eine Funktion, um den Listener wieder zu entfernen.
   */
  private onSnapSingleGame(ref: string, docId: string): () => void {
    const docRef = this.getSingleDocRef(ref, docId);
    return onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        const game = this.setGameObject(snapshot.data(), snapshot.id);
        this.gameList$.next([game]);
      } else {
        console.warn('Dokument existiert nicht:', docId);
      }
    }, (error) => {
      console.error('Snapshot-Fehler (Einzelspiel):', error);
    });
  }

  /**
   * Abonniert eine Firestore-Dokumentenliste und aktualisiert bei Änderungen.
   * @param ref Der Pfad zur Collection im Firestore.
   * @returns Eine Funktion zum Abbestellen des Snapshots.
   */
  private onSnapDocList(ref: string): () => void {
    return onSnapshot(this.getCollectionRef(ref), (snapshot) => {
      this.handleSnapshotByRef(ref, snapshot);
    }, (error) => {
      console.error("Snapshot-Fehler:", error);
    });
  }

  /**
   * Führt die passende Methode zum Verarbeiten eines Snapshots aus, abhängig vom Referenznamen.
   * @param ref Name der Collection.
   * @param snapshot Firestore-Snapshot mit den Dokumenten.
   */
  private handleSnapshotByRef(ref: string, snapshot: QuerySnapshot<DocumentData>): void {
    switch (ref) {
      case 'games':
        this.getGameList(snapshot);
        break;
      default:
        console.warn('Ref gibt es nicht:', ref);
        break;
    }
  }

  /**
   * Gibt eine Referenz auf eine Firestore-Collection zurück.
   * @param path Pfad zur Collection.
   * @returns Collection-Referenz.
   */
  private getCollectionRef(path: string): CollectionReference<DocumentData, DocumentData> {
    return collection(this.firestore, path);
  }

  private getSingleDocRef(ref: string, docId: string) {
    return doc(this.getCollectionRef(ref), docId);
  }

  /**
   * Wandelt einen Snapshot in eine Liste von Spielobjekten um und speichert diese im BehaviorSubject.
   * @param snapshot Firestore-Snapshot mit Spieldaten.
   */
  private getGameList(snapshot: QuerySnapshot<DocumentData>): void {
    const games: object[] = [];

    snapshot.forEach(doc => {
      games.push(this.setGameObject(doc.data(), doc.id));
    });

    this.gameList$.next(games);
  }

  /**
   * Erstellt ein Spielobjekt mit ID und Daten.
   * @param obj Die Daten des Spiels.
   * @param id Die ID des Firestore-Dokuments.
   * @returns Ein Spielobjekt mit ID und Daten.
   */
  private setGameObject(obj: DocumentData, id: string): { id: string, doc: any } {
    return {
      id: id,
      doc: obj
    };
  }
}