import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import LawStateContent from "@/component/LawsComponent/LawStateContent";
import IsWeedLegalState from "@/component/LawsComponent/IsWeedLegalState";
import Content from "@/component/LawsComponent/LawContentsJson";
import Bgheader from "@/component/bgheader/Bgheader";
import _ from "lodash";

const Index = (props) => {
  console.log(props);
  const router = useRouter();
  const id = router?.query?.slug;
  const [GetContant, SetContant] = useState([]);
  const ref = useRef(null);
  const [allHeigths, setAllHeight] = useState([]);

  // useEffect(() => {
  //     if (GetContant?.content !== undefined) {
  //         let data = [];
  //         ref.current.childNodes.forEach((item, index) => {
  //             data.push({
  //                 topheigth: item.offsetTop,
  //                 id: item.classList.value,
  //                 height: item.clientHeight
  //             });
  //         });
  //         setAllHeight(data);
  //     }
  // }, [GetContant]);
  // useEffect(() => {
  //     let divElement = 140;
  //     allHeigths.forEach((item) => {
  //         if (router.asPath.includes(`#${item.id}`)) {
  //             window.scroll(0, item.topheigth - divElement);
  //         }
  //     });
  // }, [router.asPath, allHeigths]);

  // useEffect(() => {
  //     Content.filter((data) => {
  //         return data.state.map((d) => {
  //             console.log(d.id === props.d , typeof parseInt(d.id) , typeof parseInt(props.d))
  //                 if (d.id ===  parseInt(props.d)) {
  //                     SetContant(d);
  //                     return d;

  //             }
  //             return null;
  //         });
  //     });
  //     axios.post(`https://api.cannabaze.com/UserPanel/Update-SiteMap/13`, {
  //         j: 'https://www.weedx.io' + router.pathname
  //     }).then((res) => {
  //     }).catch((err) => {
  //     });
  // }, [router]);
  return (
    <React.Fragment>
      {/* <LawState Title={`Cannabis Law in ${GetContant?.name}`} State={GetContant?.Country} location={useLocation().pathname}></LawState> */}
      <div className="container-fluid">
        <div className="row">
          <Bgheader text={GetContant?.name} />
          <div className="law_contertn">
            <div className="col-12 lawStateDescriptionHeadings">
              <h1 className="LawStateDescriptionHeading">
                {`Cannabis Law in `}
                {GetContant?.name}
              </h1>
              <hr />
            </div>
            <div className="col-12 d-flex">
              <div className={"col-xl-8 col-md-12"} ref={ref}>
                {GetContant?.content?.map((data1, index) => {
                  return (
                    <React.Fragment key={index}>
                      <IsWeedLegalState
                        head={data1.title}
                        description2={data1.content}
                      />
                    </React.Fragment>
                  );
                })}
              </div>
              <div className={"col-4 hidiingBLog "}>
                <LawStateContent head={GetContant?.content} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Index;

// export async function generateStaticParams() {
//     let posts = await JSON.stringify(Content)
//     posts = await JSON.parse(posts)
//     let wholedata =[...posts[0].state , ...posts[1].state]
//     return wholedata.map((product) => ({
//       category: product.name,
//       product: product.id,
//     }))
// }

export async function getServerSideProps(context) {
  console.log(context);
  let responseData = Content.filter((data) => {
      const l =  data.state.find((d) => {
            if (d.id === parseInt(context.params.slug[1])) {
              return d;
            }
          });
    return l
  });
  // axios.post(`https://api.cannabaze.com/UserPanel/Update-SiteMap/13`, {
  //     j: 'https://www.weedx.io' + router.pathname
  // }).then((res) => {
  // }).catch((err) => {
  // });
  console.log(responseData , "dfhsfjk");
  return {
    props: {
      initialData: "responseData",
    },
  };
}
