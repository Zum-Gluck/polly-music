class Song {
    constructor({ id, name, singerList, album, duration, url, copyright, index }) {
        this.id = id
        this.name = name
        this.singerList = singerList
        this.album = album
        this.duration = duration
        this.url = url
        this.copyright = copyright
        this.index = index
    }
}


export function createSong(songDetail) {
    return new Song({
        id: songDetail.id,
        name: songDetail.name,
        singerList: songDetail.ar || songDetail.song.artists,
        album: (songDetail.al ? songDetail.al.picUrl : false) || songDetail.song.album.blurPicUrl,
        duration: songDetail.dt ? formatTime(songDetail.dt) : formatTime(songDetail.song.duration),
        url: `https://music.163.com/song/media/outer/url?id=${songDetail.id}.mp3`,
        copyright: songDetail.song ? songDetail.song.fee : songDetail.fee,
        index: songDetail.index
    })
}

// 格式化时间毫秒转分秒
function formatTime(time) {
    // 取整
    time = ~~time
    var formatTime
    if (time < 10) {
        formatTime = '00:0' + time
    } else if (time < 60) {
        formatTime = '00:' + time
    } else {
        var m = ~~parseInt((time % (1000 * 60 * 60)) / (1000 * 60))
        if (m < 10) {
            m = '0' + m
        }
        var s = ~~parseInt((time % (1000 * 60)) / 1000)
        if (s < 10) {
            s = '0' + s
        }
        formatTime = m + ':' + s
    }
    return formatTime
}