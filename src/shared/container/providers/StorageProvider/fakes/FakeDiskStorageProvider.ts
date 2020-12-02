import IStorageProvider from '../models/IStorageProvider';

class FakeDiskStorageProvider implements IStorageProvider {
    private storage: string[] = [];

    public async saveFile(fileName: string): Promise<string> {
        this.storage.push(fileName);

        return fileName;
    }

    public async deleteFile(fileName: string): Promise<void> {
        this.storage.splice(this.storage.indexOf(fileName), 1);
    }
}

export default FakeDiskStorageProvider;
