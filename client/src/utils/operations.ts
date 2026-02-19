const operations: string[] = [];

export function addOperation(operation: string) {
    operations.push(operation);
    window.dispatchEvent(new Event("updateOperations"));
}

export function getOperations() {
    return [...operations];
}
