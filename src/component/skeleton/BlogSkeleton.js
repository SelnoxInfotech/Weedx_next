import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import useStyles from '@/styles/style';
const BlogSkeleton = () => {
    const classes = useStyles()
    return (
        <div>
            <div className='mb-5'>
                <Skeleton variant="rounded" className={classes.mainimage} />
            </div>
            <div>
                {
                    [1, 2, 3, 4].map((item, index) => (
                        <Skeleton key={`skeleton-text-1-${index}`} variant="text" sx={{ fontSize: '.7rem' }} />
                    ))
                }
            </div>
            <div className='mt-4 mb-5'>
                {
                    [1, 2, 3, 4].map((item, index) => (
                        <Skeleton key={`skeleton-text-2-${index}`} variant="text" sx={{ fontSize: '.7rem' }} />
                    ))
                }
            </div>
            <Skeleton variant="text" className={classes.mainheadingskeleton} />
            <div className='mt-2'>
                {
                    [1, 2, 3, 4].map((item, index) => (
                        <Skeleton key={`skeleton-text-3-${index}`} variant="text" sx={{ fontSize: '.7rem' }} />
                    ))
                }
            </div>
            <div className='mt-4'>
                {
                    [1, 2, 3, 4].map((item, index) => (
                        <Skeleton key={`skeleton-text-4-${index}`} variant="text" sx={{ fontSize: '.7rem' }} />
                    ))
                }
            </div>
            <div className='mt-4'>
                {
                    [1, 2, 3, 4].map((item, index) => (
                        <Skeleton key={`skeleton-text-5-${index}`} variant="text" sx={{ fontSize: '.7rem' }} />
                    ))
                }
            </div>
            <div className='mt-4 mb-5'>
                {
                    [1, 2, 3, 4].map((item, index) => (
                        <Skeleton key={`skeleton-text-6-${index}`} variant="text" sx={{ fontSize: '.7rem' }} />
                    ))
                }
            </div>
            <Skeleton variant="text" className={classes.mainheadingskeleton} />
            <div className='mt-2 mb-5'>
                {
                    [1, 2, 3, 4].map((item, index) => (
                        <Skeleton key={`skeleton-text-7-${index}`} variant="text" sx={{ fontSize: '.7rem' }} />
                    ))
                }
            </div>
            <Skeleton variant="text" className={classes.mainheadingskeleton} />
            <div className='mt-2'>
                {
                    [1, 2, 3, 4].map((item, index) => (
                        <Skeleton key={`skeleton-text-8-${index}`} variant="text" sx={{ fontSize: '.7rem' }} />
                    ))
                }
            </div>
            <div className='mt-4'>
                {
                    [1, 2, 3, 4].map((item, index) => (
                        <Skeleton key={`skeleton-text-9-${index}`} variant="text" sx={{ fontSize: '.7rem' }} />
                    ))
                }
            </div>
            <div className='mt-4 mb-5'>
                {
                    [1, 2, 3, 4].map((item, index) => (
                        <Skeleton key={`skeleton-text-10-${index}`} variant="text" sx={{ fontSize: '.7rem' }} />
                    ))
                }
            </div>
            <Skeleton variant="text" className={classes.mainheadingskeleton} />
            <div className='mt-2'>
                {
                    [1, 2, 3, 4].map((item, index) => (
                        <Skeleton key={`skeleton-text-11-${index}`} variant="text" sx={{ fontSize: '.7rem' }} />
                    ))
                }
            </div>
            <div className='mt-4'>
                {
                    [1, 2, 3, 4].map((item, index) => (
                        <Skeleton key={`skeleton-text-12-${index}`} variant="text" sx={{ fontSize: '.7rem' }} />
                    ))
                }
            </div>



        </div>
    )
}

export default BlogSkeleton