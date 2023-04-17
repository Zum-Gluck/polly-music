class Profile {
    constructor(profile) {
        this.userId = profile.userId
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
        userId: userInfo.userId || userInfo.profile.userId,
        backgroundUrl: userInfo.backgroundUrl || userInfo.profile.backgroundUrl,
        avatarUrl: userInfo.avatarUrl || userInfo.profile.avatarUrl,
        nickname: userInfo.nickname || userInfo.profile.nickname,
        signature: userInfo.signature || userInfo.profile.signature,
        level: userInfo.level,
        birthday: userInfo.birthday || userInfo.profile.birthday,
        gender: userInfo.gender || userInfo.profile.gender,
        city: userInfo.city || userInfo.profile.city
    })
}