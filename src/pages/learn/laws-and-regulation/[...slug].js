import React, { useEffect, useRef, useState } from "react";
import LawStateContent from "@/component/LawsComponent/LawStateContent";
import Content from "@/component/LawsComponent/LawContentsJson";
import Bgheader from "@/component/bgheader/Bgheader";
import _ from "lodash";

const Index = (props) => {
  const ref = useRef(null);
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
                      {/* <IsWeedLegalState
                       
                        head={data1.title}
                        description2={[data1]}
                     
                      /> */}
                      <div  className={data1.title.replaceAll(' ','_')} id={data1.title.replaceAll(' ','_')}>
                          <h2 id="isweedLegalHeadings" className="isweedLegalHeading">{data1.title}</h2>
                          <div className="col-12"  >
                              <section className="isWeedLegalParagraph">
                            
                                  <div dangerouslySetInnerHTML={{__html:data1?.content}}></div>
                              </section>
                          </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
              <div className={"col-4 hidiingBLog "}> 
                <LawStateContent head={props?.initialData?.content} refrence={ref} />
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
