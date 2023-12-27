export interface Tema {
    id:          number;
    name:        string;
    description: string;
    time:        string;
    linkImage:   string;
    exam_id:     number;
    subtopic:    Subtopic[];
}

 interface Subtopic {
    subtopic_id:   number;
    subtopic_name: string;
    information:   Information[];
}

 interface Information {
    information_id: number;
    content:        null | string;
    title:          null;
    type:           null;
    position:       number;
}
