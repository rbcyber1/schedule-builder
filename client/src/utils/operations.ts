import type { ClassCreditCategory } from "../../../shared/types/web";

export type Operation =
    | { type: "add-class"; data: AddClassData }
    | { type: "delete-class"; classId: number }
    | { type: "add-pusd-credit"; data: ClassCreditCategory }
    | { type: "add-csu-credit"; data: ClassCreditCategory }
    | { type: "delete-pusd-credit"; name: string }
    | { type: "delete-csu-credit"; name: string };

export interface AddClassData {
    name: string;
    crf_id: string;
    credits: number;
    grade_level: number;
    is_weighted: boolean;
    is_grade_required: boolean;
    semester_restriction: number | null;
    paired_with: number | null;
    pusd_credit_category: ClassCreditCategory[];
    csu_credit_category: ClassCreditCategory[];
}

const operations: Operation[] = [];

export function queueOperation(op: Operation) {
    operations.push(op);
    window.dispatchEvent(new Event("updateOperations"));
}

export function removeOperation(index: number) {
    operations.splice(index, 1);
    window.dispatchEvent(new Event("updateOperations"));
}

export function getOperations(): Operation[] {
    return [...operations];
}

export function clearOperations() {
    operations.length = 0;
    window.dispatchEvent(new Event("updateOperations"));
}

export function getOperationLabel(op: Operation): string {
    switch (op.type) {
        case "add-class":
            return `Add class: ${op.data.name}`;
        case "delete-class":
            return `Delete class #${op.classId}`;
        case "add-pusd-credit":
            return `Add PUSD credit: ${op.data.name} (${op.data.needed_credits})`;
        case "add-csu-credit":
            return `Add CSU credit: ${op.data.name} (${op.data.needed_credits})`;
        case "delete-pusd-credit":
            return `Delete PUSD credit: ${op.name}`;
        case "delete-csu-credit":
            return `Delete CSU credit: ${op.name}`;
    }
}

export function getOperationType(op: Operation): "add" | "delete" {
    return op.type.startsWith("delete") ? "delete" : "add";
}

export async function submitOperations(accessCode: string): Promise<string[]> {
    const results: string[] = [];

    for (const op of operations) {
        try {
            let url: string;
            let method: string;
            let body: Record<string, unknown>;

            switch (op.type) {
                case "add-class":
                    url = "/api/edit/class";
                    method = "POST";
                    body = { access_code: accessCode, ...op.data };
                    break;
                case "delete-class":
                    url = `/api/edit/class/${encodeURIComponent(op.classId)}`;
                    method = "DELETE";
                    body = { access_code: accessCode };
                    break;
                case "add-pusd-credit":
                    url = "/api/edit/credit/pusd";
                    method = "POST";
                    body = {
                        access_code: accessCode,
                        requirement_name: op.data.name,
                        credits: op.data.needed_credits,
                    };
                    break;
                case "add-csu-credit":
                    url = "/api/edit/credit/csu";
                    method = "POST";
                    body = {
                        access_code: accessCode,
                        requirement_name: op.data.name,
                        credits: op.data.needed_credits,
                    };
                    break;
                case "delete-pusd-credit":
                    url = `/api/edit/credit/pusd/${encodeURIComponent(op.name)}`;
                    method = "DELETE";
                    body = { access_code: accessCode };
                    break;
                case "delete-csu-credit":
                    url = `/api/edit/credit/csu/${encodeURIComponent(op.name)}`;
                    method = "DELETE";
                    body = { access_code: accessCode };
                    break;
            }

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                const err = await response.json().catch(() => ({}));
                results.push(
                    `FAIL: ${getOperationLabel(op)} — ${(err as { error?: string }).error ?? response.statusText}`,
                );
            } else {
                results.push(`OK: ${getOperationLabel(op)}`);
            }
        } catch (err) {
            results.push(
                `FAIL: ${getOperationLabel(op)} — ${err instanceof Error ? err.message : "Unknown error"}`,
            );
        }
    }

    operations.length = 0;
    window.dispatchEvent(new Event("updateOperations"));
    window.dispatchEvent(new Event("updateDB"));

    return results;
}
