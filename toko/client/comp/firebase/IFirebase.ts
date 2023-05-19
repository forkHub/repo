export interface ITaskState {
	PAUSED: string;
	RUNNING: string;
}

export interface IFireBase {
	initializeApp(config: IFireBaseConfig): Promise<any>;
	firestore(): IFireStore;
	storage(): IFBStorage;
	auth(): IFBAuth;
}

export interface IFBAuth {
	signInWithEmailAndPassword(email: string, password: string): Promise<IFBUserCredential>;
	onAuthStateChanged(nextObserver: (user: IFBUser) => void, error?: (a: Error) => any): void;
	setPersistence(persistence: any): Promise<void>
}

export interface IFBUserCredential {
	credential: IFBAuthCredential;
	user: IFBUser;
}

export interface IFBUser {
	displayName: string | null;
	email: string | null;
	emailVerified: boolean;
	isAnonymous: boolean;
	phoneNumber: string | null;
	photoURL: string | null;
	providerId: string;
	refreshToken: string;
	tenantId: string | null;
	metadata: IFBUserMetadata;
	providerData: IFBUserInfo[]
	uid: string;
}

export interface IFBUserInfo {
	displayName: string | null;
	email: string | null;
	phoneNumber: string | null;
	photoURL: string | null;
	providerId: string;
	uid: string;
}


export interface IFBUserMetadata {
	creationTime: string;
	lastSignInTime: string;
}

export interface IFBAuthCredential {
	providerId: string;
	signInMethod: string;
}

export interface IFireBaseConfig {
	apiKey?: string,
	authDomain?: string,
	databaseURL?: string,
	projectId?: string,
	storageBucket?: string,
	messagingSenderId?: string,
	appId?: string,
	measurementId?: string
}

export interface IUploadSnapshot {
	downloadUrl: string;
	ref: IFBReference;
}

export interface IUploadTask {
	then(p: any): Promise<any>;
	on(event: string, next: Function, error: Function, complete: Function): Function;
	snapshot: IUploadSnapshot;
}

export interface IFBReference {
	child(data: string): IFBReference;
	put(file: File | Blob): IUploadTask;
	putString(str: string, opt: string): IUploadTask;
	getDownloadURL(): Promise<any>;
	delete(): Promise<any>;
	fullNama: string;
	path: string;
	bucket: string;
}

export interface IFBStorage {
	TaskState: ITaskState;
	ref(): IFBReference;
}

export interface IFireStore {
	// doc(nama: string): IDocReference;
	collection(nama: string): ICollectionReference;
}

export interface ICollectionReference {
	get(): Promise<IQuerySnapshot>;
	doc(nama?: string): IDocReference;
	set(data: any): Promise<void>;
	add(data: any): Promise<IDocReference>;
	where(key: string, opr?: string, key2?: string): IQuery;
}

export interface IDocReference {
	id: string,
	set(data: any, option?: ISetOption): Promise<void>;
	get(): Promise<IDocumentSnapshot>;
	delete(): Promise<void>;
}

export interface IDocumentSnapshot {
	id: string;
	data(): any;
}

export interface ISetOption {
	merge?: boolean,
	mergeFields?: string
}

export interface IQuery {
	get(): Promise<IQuerySnapshot>;
	where(key: string, opr?: string, key2?: string): IQuery;
}

export interface IQuerySnapshot {
	forEach(callback: (result: IQueryDocumentSnapshot) => void): any;
}

export interface IQueryDocumentSnapshot {
	id: string;
	data(): any;
}