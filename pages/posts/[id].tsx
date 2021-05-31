import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import {  InferGetServerSidePropsType } from 'next'
import {prisma} from '../../lib/prisma'


export default function Home({ post }: InferGetServerSidePropsType<typeof getServerSideProps>) {
            if (!post) return null
                 return (
                   <div className={styles.container}>
                     <Head>
                       <title>Create Next App</title>
                       <link rel="icon" href="/favicon.ico" />
                     </Head>

                     <main className={styles.main}>
                       {post && (
                         <>
                           <h1 className={styles.title}>
                             
                             {
                               //@ts-ignore
                               post.id
                             }
                           </h1>
                           <h3 className={styles.title}>
                             
                             {
                               //@ts-ignore
                               post.title
                             }
                           </h3>
                         </>
                       )}
                     </main>
                   </div>
                 );
               }

// export const getServerSideProps = async ({params}) => {
//   const post = await prisma.post.findUnique({ where: { id: Number(params.id) } });
//   return { props: { post } }
// }

export async function getServerSideProps(req) {
  
  try {
    const post = (await prisma.post.findUnique({ where: { id: Number(req.params.id) } })) || [];
    

    return { props: { post } }
  } catch {
    return { props: { post: {} } };
  }
}