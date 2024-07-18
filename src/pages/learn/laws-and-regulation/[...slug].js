import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import LawStateContent from "@/component/LawsComponent/LawStateContent";
import IsWeedLegalState from "@/component/LawsComponent/IsWeedLegalState";
import Content from "@/component/LawsComponent/LawContentsJson";
import Bgheader from "@/component/bgheader/Bgheader";
import _ from "lodash";

const Index = (props) => {
  console.log(props.initialData);
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
          <Bgheader text={props.initialData?.name} />
          <div className="law_contertn">
            <div className="col-12 lawStateDescriptionHeadings">
              <h1 className="LawStateDescriptionHeading">
                {`Cannabis Law in `}
                {props.initialData?.name}
              </h1>
              <hr />
            </div>
            <div className="col-12 d-flex">
              <div className={"col-xl-8 col-md-12"} ref={ref}>
                {props?.initialData?.content?.map((data1, index) => {
                  return (
                    <React.Fragment key={index}>
                      <IsWeedLegalState
                       
                        head={data1.title}
                        description2={data1}
                     
                      />
                    </React.Fragment>
                  );
                })}
              </div>
              <div className={"col-4 hidiingBLog "}>
                <LawStateContent head={props?.initialData?.content} />
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
  let responseData = {}
  await Content?.forEach((data)=>{
    data?.state?.forEach((item)=>{
      if (item.id === parseInt(context.params.slug[1])) {
        responseData = item;
      }
    })
  })

  // axios.post(`https://api.cannabaze.com/UserPanel/Update-SiteMap/13`, {
  //     j: 'https://www.weedx.io' + router.pathname
  // }).then((res) => {
  // }).catch((err) => {
  // });
  responseData = await JSON.stringify(responseData)
  responseData = await JSON.parse(responseData)
  return {
    props: {
      initialData: responseData,
    },
  };
}
