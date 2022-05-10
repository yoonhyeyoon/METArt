using Photon.Pun;
using Photon.Realtime;
using System;
using System.Runtime.InteropServices;
using UnityEngine;

public class NetworkManager : MonoBehaviourPunCallbacks
{
    private string gameVersion = "1";
    private string RoomName;
    private string CharacterName;

    [DllImport("__Internal")]
    private static extern void JoinGame(string nickname, string guid);

    private void Awake() {
        RoomName = "METART";
        this.CharacterName = LobbyManager.Instance.CharacterName;
        PhotonNetwork.NickName = LobbyManager.Instance.NickName;
        PhotonNetwork.GameVersion = gameVersion;
        PhotonNetwork.ConnectUsingSettings();
    }
    
    public override void OnConnectedToMaster() {
        PhotonNetwork.JoinOrCreateRoom(RoomName, new RoomOptions { MaxPlayers = (byte) LobbyManager.Instance.MaxPlayers }, null);
    }

    public override void OnJoinedRoom() {
        string CharacterNamePath = "Character/Prefabs/" + this.CharacterName;
        PhotonNetwork.Instantiate(CharacterNamePath, new Vector3(-47, -38, -48), Quaternion.identity);
        PlayerManager.Instance.guid = Guid.NewGuid();

        #if !UNITY_EDITOR && UNITY_WEBGL
            JoinGame(LobbyManager.Instance.NickName, PlayerManager.Instance.guid.ToString());
        #endif
    }
}


// Assets/Resources/Character/Prefabs/m_9.prefab