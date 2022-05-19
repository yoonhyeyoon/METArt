using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Photon.Pun;
using UnityEngine.SceneManagement;

public class GameManager : MonoBehaviourPunCallbacks, IPunObservable
{
    public static GameManager instance
    {
        get
        {
            if (m_instance == null)
            {
                m_instance = FindObjectOfType<GameManager>();
            }

            return m_instance;
        }
    }

    private static GameManager m_instance;

    public static List<ExhibitInfo> exhibitInfos;

    public static int loadCount = 1;

    public GameObject playerPrefab;

    public void OnPhotonSerializeView(PhotonStream stream, PhotonMessageInfo info) {
        
    }

     private void Awake() {
        if (instance != this)
        {
            Destroy(gameObject);
        }
    }

    private void Start() {
        // 생성할 랜덤 위치 지정
        Vector3 randomSpawnPos = Random.insideUnitSphere * 5f;
        // 위치 y값은 0으로 변경
        randomSpawnPos.y = 0f;

        // 네트워크 상의 모든 클라이언트들에서 생성 실행
        // 단, 해당 게임 오브젝트의 주도권은, 생성 메서드를 직접 실행한 클라이언트에게 있음
        PhotonNetwork.Instantiate(playerPrefab.name, randomSpawnPos, Quaternion.identity);

        StartCoroutine(Http.GetExhibitInfos((_exhibitInfos) => {
            exhibitInfos = _exhibitInfos;
        }));
    }

    // Update is called once per frame
    void Update()
    {
        // if (Input.GetKeyDown(KeyCode.Escape))
        // {
        //     PhotonNetwork.LeaveRoom();
        // }
    }
}
