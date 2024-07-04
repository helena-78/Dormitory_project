const withMDX = require('@next/mdx')({
    extension: /\.(md|mdx)$/,
  })
  module.exports = withMDX()

  module.exports = {
    logging: {
      fetches: {
        fullUrl: true,
      },
    },
  }
