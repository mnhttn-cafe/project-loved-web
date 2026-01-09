import type { GameMode } from 'loved-bridge/beatmaps/gameMode';
import { gameModeShortName } from 'loved-bridge/beatmaps/gameMode';
import type { Beatmapset } from 'loved-bridge/tables';
import ContextMenu from './ContextMenu';
import type { ContextMenuItem } from './ContextMenu';

interface BeatmapProps {
  beatmapset: Beatmapset;
  gameMode?: GameMode;
}

export default function Beatmap({ beatmapset, gameMode }: BeatmapProps) {
  let link = `https://osu.ppy.sh/beatmapsets/${beatmapset.id}`;

  if (gameMode != null) {
    link += `#${gameModeShortName(gameMode)}`;
  }

  const contextMenuItems: ContextMenuItem[] = [
    {
      label: 'Copy beatmapset ID',
      onClick: () => {
        navigator.clipboard.writeText(String(beatmapset.id));
      },
    },
    {
      label: 'Copy beatmapset link',
      onClick: () => {
        navigator.clipboard.writeText(link);
      },
    },
    {
      label: 'Open in osu!',
      onClick: () => {
        window.location.href = `osu://b/${beatmapset.id}`;
      },
    },
  ];

  return (
    <>
      <a className='beatmap' href={link} target='_blank' rel='noopener,noreferrer'>
        <div className='beatmap-artist'>{beatmapset.artist}</div>
        <div className='beatmap-title'>{beatmapset.title}</div>
      </a>
      <ContextMenu items={contextMenuItems} />
    </>
  );
}
