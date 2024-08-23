import React,{useEffect} from "react";
import ScrollContainer from "react-indiana-drag-scroll"
// import parse from 'html-react-parser';
import { useParams } from "react-router-dom";
import Link from "next/link";
// import { LazyLoadImage } from "react-lazy-load-image-component";
import Image from "next/image";
import { modifystr } from "@/hooks/utilis/commonfunction";
const RecentPost = () => {
 const id = useParams()
   const [News, SetNews] = React.useState([])
   useEffect(() => {
    const fetchData = async () => {
        try {
            const res = await fetch("https://api.cannabaze.com/UserPanel/Get-News/");
            const data = await res.json();
            const newdata = data.filter((item) => item.id !== id.id);
            SetNews(newdata);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    fetchData();
}, [id]);

    return (
        <React.Fragment>
            <div className="  my-3 my-md-5">
            <h3 className="section_main_title">Recent Blogs</h3>
                    <div className="blogs_card_slider">
                        <ScrollContainer className="ScrollContainerRelative">
                        
                                {News?.map((ele, index) => {
  
                                        return (
                                            <Link href={`/${ele.Category_Name==='BLOGS'? "blogs":'cannabis-news'}/${modifystr(ele.Title)}/${ele.id}`} key={index}> 
                                                <div className="new_blog_card">
                                                    <div className="new_blog_card_img">
                                                        <Image width={500} height={500}
                                                        src={`${ele.Image}`}
                                                        alt={ele.Title}
                                                        quality={70}
                                                        title={ele.Title}
                                                        unoptimized={true}
                                                        style={{ pointerEvents: "none" }} />
                                                    </div>
                                                    <div className="new_blog_card_text">  
                                                        <span className="latest_font_size  ">
                                                            {ele.Title}
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        )                                   
                                })}
                        
                        </ScrollContainer>
                    </div>
            
            </div >
        </React.Fragment>
    )
}
export default RecentPost