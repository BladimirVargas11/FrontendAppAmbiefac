export interface TopicModel {
    id:        number;
    name:      string;
    time:      string;
    linkImage: string;
    exam_id:   null;
    subtopic:  Subtopic[];
}

interface Subtopic {
    subtopic_id:   number;
    subtopic_name: null;
    information:   any[];
}