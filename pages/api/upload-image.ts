import aws from 'aws-sdk'

export default async function handler(req, res) {
  try {
    // 1. S3 Bucketの新しいインスタンスを作成します。
    const s3 = new aws.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
      region: process.env.AWS_REGION,
    })

    // 2. リージョン、クレデンシャル、追加のリクエストオプションでメイン設定クラスを更新します。
    aws.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
      region: process.env.AWS_REGION,
      signatureVersion: 'v4',
    })

    // 3. S3バケットへの書き込みを許可する署名付きURLを生成します。
    const post = await s3.createPresignedPost({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Fields: {
        key: req.query.file,
      },
      Expires: 60, // seconds
      Conditions: [
        ['content-length-range', 0, 5048576], // up to 1 MB
      ],
    })

    // 4. ファイルアップロードに使用される署名済みURLを返します。
    return res.status(200).json(post)
  } catch (error) {
    console.log(error)
  }
}
