class Profile {
    constructor(profile) {
        this.backgroundUrl = profile.backgroundUrl;
        this.avatarUrl = profile.avatarUrl;
        this.nickname = profile.nickname;
        this.signature = profile.signature;
        this.level = profile.level;
        this.birthday = profile.birthday;
        this.gender = profile.gender
        this.city = profile.city
    }
}


export function createProfile(userInfo) {
    return new Profile({
        backgroundUrl: userInfo.backgroundUrl,
        avatarUrl: userInfo.avatarUrl,
        nickname: userInfo.nickname,
        signature: userInfo.signature,
        level: userInfo.level,
        birthday: userInfo.birthday,
        gender: userInfo.gender,
        city: userInfo.city
    })
}