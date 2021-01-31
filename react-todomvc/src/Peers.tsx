import React from 'react';

export interface Peer {
    url: string
}

type PeersProps = {
  onFetchUrl: (url: string) => Promise<void>,
  onPushToUrl: (url: string) => Promise<void>,
}


export function Peers({onFetchUrl, onPushToUrl}: PeersProps){
    const [peers, setPeers] = React.useState<Peer[]>([])

    const addPeer = (url: string) => {
      const newPeers = Array.from(peers)
      newPeers.push({url})
      setPeers(newPeers)
    }

    const [newPeerUrl, setNewPeerUrl] = React.useState('');
    const onNewPeerUrl_enter = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key == 'Enter' && newPeerUrl.length > 0) {
        addPeer(newPeerUrl)
        setNewPeerUrl('')
      }
    }
    return (<div className="peers">
        <h1>Peers</h1>
        <input
          className="new-peer"
          placeholder="Peer URL"
          autoFocus
          onKeyPress={onNewPeerUrl_enter}
          onChange={e => setNewPeerUrl(e.target.value)}
          value={newPeerUrl}
        />
        {peers.map(p => <Peer key={p.url} peer={p} onFetchPressed={onFetchUrl} onPushPressed={onPushToUrl} />)}
    </div>)
}

type PeerProps = {
  peer: Peer,
  onFetchPressed: (url: string) => Promise<void>,
  onPushPressed: (url: string) => Promise<void>,
}

export function Peer({peer, onFetchPressed, onPushPressed}: PeerProps){
  return (<div className="peer">
    <div className="peer-url">
        <p>URL:</p>
        <div className="url-container">
            <p className="url">{peer.url}</p>
        </div>
    </div>
    <div className="peer-controls">
      <button onClick={() => onFetchPressed(peer.url)}>Fetch</button>
      <button onClick={() => onPushPressed(peer.url)}>Push</button>
    </div>
  </div>)
}
