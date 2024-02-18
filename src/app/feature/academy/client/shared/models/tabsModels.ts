import { icon } from "@fortawesome/fontawesome-svg-core";

export interface TabsModel{
    label: string, 
    icon: string
}

export const tabs: TabsModel[] = [
    {
        label : 'Perfil',
        icon : 'fa-solid fa-user'
    },
    {
        label : 'Tematicas',
        icon : 'fa-solid fa-book-open'
    },
]