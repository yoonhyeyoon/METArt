using UnityEngine;
using System.Collections;
using UnityEngine.Networking;
using Newtonsoft.Json;
using System.Collections.Generic;

public class Http {
    static string BASE_URL = "https://k6d106.p.ssafy.io/api/v1";

    public static IEnumerator GetExhibitInfos(System.Action<List<ExhibitInfo>> callback) {
        List<ExhibitInfo> exhibitInfos = null;

        UnityWebRequest www = UnityWebRequest.Get($"{BASE_URL}/exhibition");
        yield return www.SendWebRequest();

        if (www.result != UnityWebRequest.Result.Success) {
            Debug.Log(www.error);
        }
        else {
            string res = www.downloadHandler.text;
            var settings = new JsonSerializerSettings
                    {
                        NullValueHandling = NullValueHandling.Ignore,
                        MissingMemberHandling = MissingMemberHandling.Ignore
                    };
            exhibitInfos = JsonConvert.DeserializeObject<List<ExhibitInfo>>(res, settings);
        }
        callback(exhibitInfos);
    }

    public static IEnumerator GetTexture(int exhibitId, string tokenURI, System.Action<Texture2D> callback) {
        yield return new WaitUntil(() => GameManager.loadCount >= exhibitId);

        UnityWebRequest www = UnityWebRequestTexture.GetTexture(tokenURI);
        yield return www.SendWebRequest();

        Texture2D myTexture = DownloadHandlerTexture.GetContent(www);
        www.Dispose();
        www = null;
        myTexture.Compress(false);
        callback(myTexture);
    }
}

public class ExhibitInfo
{
    public long id { get; set; }
    public long saleId { get; set; }
    public long price { get; set; }
    public long artId { get; set; }
    public string name { get; set; }
    public string tokenURI { get; set; }
    public string description { get; set; }
    public string createdAt { get; set; }
    public string creatorName { get; set; }
    
}