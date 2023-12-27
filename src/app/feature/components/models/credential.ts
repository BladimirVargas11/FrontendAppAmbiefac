import { Role } from "./role";

export interface Credentials {
    id:                    number;
    username:              string;
    email:                 string;
    role:                  Role;
    jwt:                   string;
    accountNonExpired:     boolean;
    credentialsNonExpired: boolean;
    accountNonLocked:      boolean;
    authorities:           null;
    enabled:               boolean;
}