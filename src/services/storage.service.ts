import { Injectable } from "@angular/core";
import { LocalUser } from "../models/local_user";
import { STORAGE_KEYS } from "../config/storage_keys.config";

@Injectable()
export class StorageService {
    getLocalUser() : LocalUser {
        let usr = localStorage.getItem(STORAGE_KEYS.localUser);
        if(usr == null){
            return null;
        }
        else {
            return JSON.parse(usr);
        }
    }

    setLocalUser(obj : LocalUser) {
        if(obj == null) {
            localStorage.removeItem(STORAGE_KEYS.localUser);
        }
        else {
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
        }
    }

    getPwd() {
        let pwd = localStorage.getItem(STORAGE_KEYS.pwd);
        if(pwd == null) {
            return null;
        }
        else {
            return pwd;
        }
    }

    setPwd(pwd) {
        if(pwd == null) {
            localStorage.removeItem(STORAGE_KEYS.pwd);
        }
        else {
            localStorage.setItem(STORAGE_KEYS.pwd, pwd);
        }
    }
}