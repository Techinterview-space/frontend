import { createIPX, createIPXNodeServer, ipxHttpStorage } from 'ipx'
import { RequestHandler } from 'express';

const cdnBase = "https://techinterview.fra1.cdn.digitaloceanspaces.com";

const ipx = createIPX({
  storage: ipxHttpStorage({
    domains: ["techinterview.fra1.cdn.digitaloceanspaces.com"],
  }),
});

const ipxHandler = createIPXNodeServer(ipx);

export const IpxMiddleware: RequestHandler = (req, res) => {
  const isGif = req.url.endsWith(".gif");
  const format =
    !isGif && req.headers.accept?.includes("image/webp")
      ? "format:webp"
      : "_";
  req.url = `/${format}/${cdnBase}${req.url}`;
  res.setHeader("Cache-Control", "public, max-age=86400, s-maxage=604800");
  ipxHandler(req, res);
}