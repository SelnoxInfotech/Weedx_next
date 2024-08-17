import React, { useEffect, useRef, useState } from "react";
import LawStateContent from "@/component/LawsComponent/LawStateContent";
import Content from "@/component/LawsComponent/LawContentsJson";
import Bgheader from "@/component/bgheader/Bgheader";
import _ from "lodash";
import classes from '@/styles/customstyle.module.scss';
import {LawState} from '../../../component/ScoPage/LearnSeo';
import  {useRouter} from "next/router";
const Index = (props) => {
  const ref = useRef(null);
  const router  = useRouter()
  return (
    <React.Fragment>
      <LawState Title={`Cannabis Law in ${props?.initialData?.name}`} State={props?.initialData?.Country} location={router.asPath}></LawState>
      <div className="container-fluid">
        <div className="row">
          <Bgheader text={props.initialData?.name} />
          <div className="law_contertn">
            <div className="col-12 lawStateDescriptionHeadings">
              <h1 className="LawStateDescriptionHeading">
                {`Cannabis Law in `}{props.initialData?.name}
              </h1>
              <hr />
            </div>
            <div className="col-12 d-flex">
              <div className={"col-xl-8 col-md-12"} ref={ref}>
                {props?.initialData?.content?.map((data1, index) => {
                  return (
                    <React.Fragment key={index}>
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
                  <p className={classes.lawDisclaimer}> <b>{`Note :-`}</b> {`By understanding the cannabis laws and regulations in ${props.initialData?.name}, residents and visitors alike can ensure they are compliant and informed. Whether you're purchasing, consuming, or considering cultivation, it's crucial to stay updated with the latest legal guidelines.`}</p>
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
  responseData = await JSON.stringify(responseData)
  responseData = await JSON.parse(responseData)
  return {
    props: {
      initialData: responseData,
    },
  };
}
