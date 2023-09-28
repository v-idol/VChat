import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const danceList = [];
  const danceDir = path.join(process.cwd(), '/public/dance');
  const dances = fs.readdirSync(danceDir, { withFileTypes: true });
  for (const dance of dances) {
    const danceMeta = fs.readFileSync(path.join(danceDir, dance.name, 'meta.json'), 'utf8');
    const readme = fs.readFileSync(path.join(danceDir, dance.name, 'readme.txt'), 'utf8');
    const meta = JSON.parse(danceMeta);
    const { src, audio } = meta;
    danceList.push({
      ...meta,
      src: `/dance/${dance.name}/${src}`,
      audio: `/dance/${dance.name}/${audio}`,
      cover: `/dance/${dance.name}/cover.jpg`,
      thumb: `/dance/${dance.name}/thumb.jpg`,
      readme,
    });
  }

  res.status(200).json(danceList);
}
