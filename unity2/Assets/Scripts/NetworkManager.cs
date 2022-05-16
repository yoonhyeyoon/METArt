using Photon.Pun;
using Photon.Realtime;
using System;
using System.Runtime.InteropServices;
using UnityEngine;

public class NetworkManager : MonoBehaviourPunCallbacks
{
    private string gameVersion = "1";
    private string RoomName;

    private void Awake() {
        RoomName = "METART";
        PhotonNetwork.GameVersion = gameVersion;
        PhotonNetwork.ConnectUsingSettings();
    }

    public override void OnConnectedToMaster() {
        PhotonNetwork.JoinOrCreateRoom(RoomName, new RoomOptions { MaxPlayers = 19 }, null);

        PhotonNetwork.LoadLevel("showroom");
    }
}
