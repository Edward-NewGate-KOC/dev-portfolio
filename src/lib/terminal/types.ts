export interface TerminalState {
    history: CommandHistoryItem[];
    directory: string;
    commandHistory: string[];
    historyIndex: number;
}

export interface CommandHistoryItem {
    command: string;
    output: React.ReactNode | string;
    dir: string;
    timestamp: Date;
    status?: "success" | "error" | "warning";
}

export interface TerminalCommand {
    name: string;
    description: string;
    usage?: string;
    execute: (args: string[], context: TerminalContext) => Promise<void | React.ReactNode> | void | React.ReactNode;
}

export interface TerminalContext {
    setDirectory: (dir: string) => void;
    clear: () => void;
    exit: () => void;
    pushToHistory: (item: CommandHistoryItem) => void;
    directory: string;
    username: string;
}
