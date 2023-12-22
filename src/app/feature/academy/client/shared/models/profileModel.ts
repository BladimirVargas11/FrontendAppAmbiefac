interface Role {
    id: number;
    name: string;
  }
  
interface Credentials {
    id: number;
    username: string;
    email: string;
    role: Role;
    jwt: string;
    authorities: any; // Ajusta el tipo según tus necesidades
    accountNonExpired: boolean;
    credentialsNonExpired: boolean;
    accountNonLocked: boolean;
    enabled: boolean;
  }
  
  export interface ProfileModel {
    id: number;
    fullName: string;
    credentials: Credentials;
  }
  