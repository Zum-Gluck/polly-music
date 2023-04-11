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
        duration: songDetail.dt ? songDetail.dt : songDetail.song.duration,
        url: `https://music.163.com/song/media/outer/url?id=${songDetail.id}.mp3`,
        copyright: songDetail.song ? songDetail.song.fee : songDetail.fee,
        index: songDetail.index
    })
}