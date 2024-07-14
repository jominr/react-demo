import React, {useState, useEffect} from 'react';
import classes from './index.module.css'
const PAGE_SIZE = 6;

const Index = () => {
  const [fetchLoading, setFetchLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [jobIds, setJobIds] = useState(null);
  const [jobs, setJobs] = useState([]);

  useEffect(()=> {
    fetchJobs(page)
  }, [page]);

  const fetchJobs = async (currentPage) => {
    const currentIds = await fetchJobIds(currentPage);
    setFetchLoading(true);
    const jobsForPage = await Promise.all(currentIds.map((jobId)=> {
      return fetch(`https://hacker-news.firebaseio.com/v0/item/${jobId}.json`
        ).then(res => res.json())
    }))
    setJobs([...jobs, ...jobsForPage]);
    setFetchLoading(false);

  }

  const fetchJobIds = async (currentPage) => {
    let jobs = jobIds;
    if (!jobs) {
      const res = await fetch(
        'https://hacker-news.firebaseio.com/v0/jobstories.json', 
      );
      jobs = await res.json();
      setJobIds(jobs);
    }
    const start = currentPage * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return jobs.slice(start, end);
  }
  return (
    <div>
      <h1>Hacker News Jobs Board</h1>
      {
        jobIds == null ? (
          <p>Loading...</p>
        ): (
          <div>
            <div className={classes.jobs}>
              {
                jobs.map((job)=>(
                  <JobPost key={job.id} {...job}/>
                ))
              }
            </div>
            {
              jobs.length > 0 && (page + 1) * PAGE_SIZE < jobIds.length && (
                <button
                  disabled={fetchLoading}
                  onClick={()=>setPage(page + 1)}
                >
                  {fetchLoading ? 'Loading...' : 'Load more jobs'}
                </button>
              )
            }
            
          </div>
        )
      }
      
    </div>
  );
};


const JobPost = ({url, by, time, title}) => {
  return (
    // role也是用来辅助屏幕阅读器的，放在这种div这类没有具体含义的标签上
    /*
      role="button"：这表示应将 <div> 元素视为按钮。
      role="heading"：这表示 <div> 元素包含标题。
      role="navigation"：这表示 <div> 元素包含导航菜单。
      role="alert"：这表示 <div> 元素包含警告消息。
      role="dialog"：这表示 <div> 元素包含对话框。
    */
    <div className={classes.post} role="listitem">
      <h3 className={classes.postTitle}>
        { url ? (
          // rel属性用于指定当前页面与被链接文档之间的关系。
          /*
          rel 属性的常用值包括：

            alternate：指示当前页面有替代版本，例如针对不同语言或设备的版本。
            author：指示链接指向包含文档作者信息的页面。
            bookmark：指示链接指向当前页面的书签或收藏夹。
            external：指示链接指向当前网站外部的网站。
            help：指示链接指向一个提供帮助信息的页面。
            icon：指示链接指向一个图标文件，该图标可用于表示链接的目的地。
            license：指示链接指向包含文档许可信息的页面。
            next：指示链接指向下一个页面，通常用于分页导航。
            nopreferer：指示搜索引擎不要将当前页面作为链接目标页面的首选页面。
            prefetch：指示浏览器在用户访问之前预取链接目标页面。
            prev：指示链接指向前一个页面，通常用于分页导航。
            search：指示链接指向一个搜索结果页面。
            stylesheet：指示链接指向一个 CSS 样式表文件，该样式表用于格式化链接目标页面。
          */
          <a
            href={url}
            target="_blank"
            rel="noopener"
          >
            {title}
          </a>
        ) : (
          title
        )}
      </h3>
      <p>By {by} &middot; {new Date(time * 1000).toLocaleString()}</p>
    </div>
  )

}

export default Index;