import { icon } from "@fortawesome/fontawesome-svg-core";

export interface TabsModel{
    label: string, 
    icon: string
}

export const tabs: TabsModel[] = [
    {
        label : 'perfil',
        icon : 'fa-solid fa-user'
    },
    {
        label : 'cursos',
        icon : 'fa-solid fa-book-open'
    },
]