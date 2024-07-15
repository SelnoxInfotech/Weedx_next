import React from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import useStyles from "@/styles/style";
import { Post_Comment } from "@/hooks/apicall/api"
import Createcontext from "@/hooks/context"
import _ from "lodash"
const RecentPostComment = ({  scrolltocomment, id, GetUserComment, SetUserComment,Get }) => {
    const { state } = React.useContext(Createcontext)
    const [GetComment, SetComment] = React.useState('')
    const classes = useStyles()
    function WriteComment(e) {
        if (state.login) {

            SetComment(e.target.value)
        }
        else{
            alert("Please first login")
        }
    }
    const PostComment = async () => {
        
        await Post_Comment(id, GetComment).then((res) => {
                  SetUserComment({ ...GetUserComment, "CommentCounts": res.data.CommentCounts })
                  Get(id)
                  SetComment('')
                  scrolltocomment()
        }).catch((error) => {
           
        })

    }
    React.useEffect(() => {
        SetComment( _.find(GetUserComment.UserComment, (o) => { return o?.user === state?.Profile?.id })?.comment  === undefined ? "" : _.find(GetUserComment.UserComment, (o) => { return o?.user === state?.Profile?.id })?.comment)
    }, [GetUserComment ,state])

    return (
        <React.Fragment>
            <div className="col-12 recentPost_comment_container px-0">
                <div className="recentPost_commentInner_cont">
                    <div className="mt-2 recentPostComment_head_cont">
                        <h2 className="recentPostComment_head">Comment</h2>
                    </div>
                    <div className="recentPostComment_editor_cont mt-2">
                        <textarea type="text" value={GetComment} onChange={WriteComment} className="BolgCommentBOx" rows="4" cols="50"></textarea>
                    </div>
                    <div className="col-12 p x-0  recentPostBtnCenter mt-4">

                        <Box
                            className={`recentPostBox_width1 ${classes.recentPostCancelBtn}`}
                        >
                            <LoadingButton variant="outlined">Cancel</LoadingButton>
                        </Box>
                        <Box
                            className={`recentPostBox_width2 ${classes.recentPostCancelBtn2}`}
                        >
                            <LoadingButton disabled={state.login === false ?true :false} onClick={PostComment} variant="outlined">Post</LoadingButton>
                        </Box>
                    </div>

                </div>
            </div>

        </React.Fragment>
    )
}
export default RecentPostComment