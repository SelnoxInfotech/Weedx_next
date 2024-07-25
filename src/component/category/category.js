import * as React from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import { useRouter } from 'next/router';
import Categoryskeleton from "../skeleton/categoryskeleton";
import { FirstLetterCaps } from "../../hooks/utilis/commonfunction"
import Image from 'next/image';
const Category = ({ ShowCategoryProduct, Category, Skeleton }) => {
    const Params = useRouter().query;
    const location = useRouter()
    return (
        <React.Fragment>
            <div className=' CategoryBordrr'>
                <div className='row'>
                    {
                        !Skeleton ? <div className="catagoryTabs_section">

                            {
                                Object.keys(Params).length === 0 ? <h2 className='shopByCategoryHeading'>Shop By Category</h2> : null
                            }

                            <ScrollContainer className="ScrollContainerRelative">
                                {Category?.map((ele, index) => {
                                
                                    return (
                                        <div className='CategorySliderImageBlock' key={index}>
                                            <div className='slider1'>

                                                <Image
                                                    onClick={() => { ShowCategoryProduct(ele.id, ele.name) }}
                                                    src={ele.categoryImages} alt={ele.name.substr(0, 100)}
                                                    title={ele.name.substr(0, 100)}
                                                    width={100}
                                                    height={100}
                                                    unoptimized={true}
                                                    className={location.pathname.includes('/menu-integration') ? ' Integrated-catagoriesTabImg' : ' catagoriesTabImg'} />
                                            </div>
                                            <div className='col center Category_title' >
                                                <p>{FirstLetterCaps(ele?.name?.substr(0, 100))}</p>
                                            </div>

                                        </div>
                                    )
                                })}
                            </ScrollContainer>
                        </div>
                            :
                            <Categoryskeleton></Categoryskeleton>
                    }
                </div>
            </div>

        </React.Fragment>
    )
}
export default Category





// category_container,catgory_wraper ,cat_main_div