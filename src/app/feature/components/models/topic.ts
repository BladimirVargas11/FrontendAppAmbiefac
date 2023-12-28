export interface Topìc {
    id:          number;
    name:        string;
    description: string;
    time:        string;
    linkImage:   string;
    exam_id:     number;
    subtopic:    Subtopic[];
}

export interface Subtopic {
    subtopic_id:   number;
    subtopic_name: string;
    information:   Information[];
    showSubMenu:    boolean;

}

interface Information {
    information_id: number;
    content:        null | string;
    title:          null;
    type:           null;
    position:       number;
}

export const emptyTopic: Topìc = {
    id: 0,
    name: '',
    description: '',
    time: '',
    linkImage: '',
    exam_id: 0,
    subtopic: [],
  };
  

  