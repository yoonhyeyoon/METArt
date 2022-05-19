using UnityEngine;
using System.Collections;
using UnityEngine.Networking;
using Newtonsoft.Json;
using System.Collections.Generic;

public class Http {
    static string BASE_URL = "https://k6d106.p.ssafy.io/api/v1/exhibition/info";

    public static IEnumerator GetExhibitInfo(long exhibitId, System.Action<ExhibitInfo> callback) {
        ExhibitInfo exhibitInfo = null;

        UnityWebRequest www = UnityWebRequest.Get($"{BASE_URL}/{exhibitId}");
        yield return www.SendWebRequest();

        if (www.result != UnityWebRequest.Result.Success) {
            Debug.Log(www.error);
        }
        else {
            string res = www.downloadHandler.text;
            exhibitInfo = JsonConvert.DeserializeObject<ExhibitInfo>(res);
        }
        callback(exhibitInfo);
    }

    public static IEnumerator GetTexture(string tokenURI, System.Action<Texture> callback) {
        UnityWebRequest www = UnityWebRequestTexture.GetTexture(tokenURI);
        yield return www.SendWebRequest();

        Texture myTexture = DownloadHandlerTexture.GetContent(www);
        callback(myTexture);
    }
}

public class ExhibitInfo
{
    public long id { get; set; }
    public long saleId { get; set; }
    public long price { get; set; }
    public string name { get; set; }
    public string tokenURI { get; set; }
    public string createdAt { get; set; }
    public string creatorName { get; set; }
    
}