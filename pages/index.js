import Head from 'next/head'
import Layout, {siteTitle} from '../components/layout';
import utilStyles from '../styles/utils.module.scss'
import Image from 'next/image'
import home from '../styles/home.module.scss'

export async function authenticateRequest() {
  const email = process.env.API_EMAIL;
  const password = process.env.API_PASSWORD;
  const url = `https://sebibasti-blog-api.herokuapp.com/auth/login?email=${email}&password=${password}`

  const resToken = await fetch(url, {
    method: 'post'
  });

  return await resToken.json();
}

export async function getData(url, token) {
  const resData = await fetch(url, {
    method: 'get',
    headers: new Headers({
      'Authorization': token['auth_token'],
      'Accept': 'application/vnd.posts.v1+json'
    })
  });

  const blogData = await resData.json();

  if (!blogData) {
    return {
      notFound: true
    }
  }

  return await blogData;
}

export async function getAllPostIds({ blogData }) {
  return await blogData.data.map(obj => {
    return {
      params: {
        id: obj.attributes.title.replace(/\s/g, '-').replace(/[?]/g, ''),
        originId: obj.id // include original id for API request
      }
    }
  });
}

export async function getStaticProps() {
  const token = await authenticateRequest();
  const url = 'https://sebibasti-blog-api.herokuapp.com/posts'
  const blogData = await getData(url, token);

  return {
    props: { blogData }
  }
}

export default function Home({ blogData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={home.top}>
        <div className={home["picture-container"]}>
          <Image
            src="/images/profile.jpeg"
            alt="Profile picture Sebastian Remm"
            className={home.picture}
            width={500}
            height={500}
          />
        </div>
        <span className={home["top-content"]}>
          Welcome to my super awesome website.
        </span>
      </section>

      <section className={home["references-container"]}>
        <div className={home["references-picture-container"]}>
          <Image
            src="/images/references_placeholder.png"
            alt="references placeholder"
            className={home["references-picture"]}
            width={200}
            height={500}
          />
        </div>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {blogData['data'].map(({ id, attributes }) => (
            <li className={utilStyles.listItem} key={id}>
              {attributes['title']}
              <br/>
              {id}
              <br/>
              {attributes['created_at']}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
