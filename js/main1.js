


// 1:歌曲搜索接口
// 请求地址:https://autumnfish.cn/search
//     请求方法:get
// 请求参数:keywords(查询关键字)
// 响应内容:歌曲搜索结果



var app =new Vue({

    el : "#player",



    data:{
        query:"",
        musicList:[],
        musicUrl: "",
        musicCover:"",
        hotComments:"",
        isPlaying: false,



    },

    methods: {

        // 搜索歌曲

        searchMusic:function () {
            var that = this;
            axios.get("https://autumnfish.cn/search?keywords=" + this.query)
                .then(function (response) {
                    // console.log(response);
                    // console.log(response.data.result.songs);
                    that.musicList= response.data.result.songs;
                    // console.log(response.data.result.songs)




                    },function (err) {

                    }
                )

        },


        // 播放歌曲
        // 我根据评论找到了最新的音乐播放路径，"https://api.paugram.com/netease/?id="，通过返回的参数后找到response.data.link就是音乐的播放路径了
        // 2:歌曲url获取接口
        // 请求地址:https://autumnfish.cn/song/url
        // 请求方法:get
        // 请求参数:id(歌曲id)
        // 响应内容:歌曲url地址


        playMusic:function (musicId) {
            var that = this;


            // console.log(musicId)
            axios.get("https://api.paugram.com/netease/?id="+musicId)
            // axios.defaults.withCredentials = true;
            // axios.get("https://autumnfish.cn/song/url?id="+musicId)
                .then(function (response) {
                    // console.log(response.data.link);
                    // console.log(response.data);
                    that.musicUrl = response.data.link;

                    },function (err) {

                    }
                )

            // 获取歌曲详情




            axios.get("https://api.paugram.com/netease/?id="+musicId)
                .then(function (response) {
                       // console.log(response.data)
                    that.musicCover= response.data.cover;



                    },function (err) {

                    }
                )

            // 歌曲评论获取


            axios.get("https://autumnfish.cn/comment/hot?type=0&id="+musicId)

                .then(function (response) {

                        console.log(response.data.hotComments);
                        // console.log(response.data.data.hotComments);
                        that.hotComments = response.data.hotComments;


                        // that.musicCover= response.data.cover;



                    },function (err) {

                    }
                )









        },


        play:function () {

            console.log("play");
            this.isPlaying = true;




        },
        pause:function () {

            console.log("pause");
            this.isPlaying = false;

        }











    }








})