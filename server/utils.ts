export function isFileExt(file: string): boolean {
    let len = file.length;

    if (file.indexOf('.') === -1) {
        return false;
    } else if (!(file[len - 5] === '.' ||
        file[len - 4] === '.' ||
        file[len - 3] === '.' ||
        file[len - 2] === '.' ||
        file[len - 1] === '.')) {
        return false;
    } else if (file.indexOf('/api') === 0 || file.indexOf('/?') === 0) {
        return false;
    }

    return true;
}
