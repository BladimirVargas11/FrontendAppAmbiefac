import { Credentials } from "./credential";
import { Response } from "./response";


export interface Client {
    id:          number;
    fullName:    string;
    credentials: Credentials;
}

export const initialClient: Response<Client> = {
    success: false,
    message: "",
    data: {
        id: 0,
        fullName: "",
        credentials: {
            id: 0,
            username: "",
            email: "",
            role: {
                id: 0,
                name: ""
            },
            jwt: "",
            accountNonExpired: false,
            credentialsNonExpired: false,
            accountNonLocked: false,
            authorities: null,
            enabled: false
        }
    }
};

