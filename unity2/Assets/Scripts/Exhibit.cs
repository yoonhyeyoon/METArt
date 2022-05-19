using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Exhibit : MonoBehaviour
{
    HashSet<Material> m_materials = new HashSet<Material>();
    Dictionary<Material, Color32> originalColors = new Dictionary<Material, Color32>();
 
    Shader TransparentShader;
    Shader OriginalShader;

    Transform m_center;

    public Color32 m_Color;

    public int exhibitId;
    public ExhibitInfo exhibitInfo;
    public string exhibitName;
    public string content;
    public string helpmessage;
    public Material m_material;
    public long price;

    public string year;
    public string producer;

    public int m_MinRotate;
    public int m_MaxRotate;

    public float m_MidRigHeight;
    public float m_TopRigHeight;

    public int m_minFOV;
    public int m_maxFOV;


    void Awake()
    {
        m_minFOV = 20;
        m_maxFOV = 40;
        if (gameObject.CompareTag("Exhibit"))
        {
            m_Color = new Color32(255, 0, 0, 100);
        }
        // if (gameObject.CompareTag("GuestBook"))
        // {
        //     m_Color = new Color32(0, 0, 255, 100);
        // }
        // if (gameObject.CompareTag("Game"))
        // {
        //     m_Color = new Color32(255, 0, 0, 100);
        // }
        
        m_center = transform.GetChild(transform.childCount - 1);
        
        MeshRenderer[] childMeshs = GetComponentsInChildren<MeshRenderer>();
        
        for (int i = 0; i < childMeshs.Length; i++)
        {
            Material[] materials = childMeshs[i].materials;
            for (int j = 0; j < materials.Length; j++)
            {
                Material material = materials[j];
                m_material = material;

                if (m_materials.Add(material))
                {
                    m_materials.Add(material);
                    OriginalShader = material.shader;
                }
            }
        }

        foreach (Material material in m_materials)
        {
            originalColors.Add(material, material.color);
        }

        TransparentShader = Shader.Find("Legacy Shaders/Transparent/Diffuse");
    }
     

    public Transform GetCenter()
    {
        return m_center;
    }
    public void StartBlink()
    {
        StartCoroutine("BlinkObject");
    }
    public void StopBlink()
    {
        StopCoroutine("BlinkObject");
        FillColor();
    }
    void BlurredColor()
    {
        foreach (Material material in m_materials)
        {
            material.shader = TransparentShader;
            material.color = m_Color;
        }
    }
    void FillColor()
    {
        foreach (Material material in m_materials)
        {
            material.shader = OriginalShader;
            Color32 originalColor = originalColors[material];
            material.color = new Color32(originalColor[0], originalColor[1], originalColor[2], originalColor[3]);
        } 
    }
    IEnumerator BlinkObject()
    {
        yield return null;
        while (true)
        {
            BlurredColor();
            yield return new WaitForSeconds(0.5f);

            FillColor();
            yield return new WaitForSeconds(0.5f);
        }
    }
    public virtual void OpenRankBoard()
    {
    }
    public virtual void StartGame()
    {
    }

    public virtual void CloseRankBoard()
    { 
    }
    public virtual void RequestGameRank()
    {
    }
    
    public virtual void GetInfo(int _exhibitId) {
        exhibitId = _exhibitId;
        
        m_MinRotate = -180;
        m_MaxRotate = 180;

        m_TopRigHeight = 15f;
        m_MidRigHeight = 5f;

        m_minFOV = 5;
        m_maxFOV = 20;

        StartCoroutine(GetTexture());
    }

    IEnumerator GetTexture()
    {   
        while (GameManager.exhibitInfos == null) {
            yield return new WaitForSeconds(1);
        }

        exhibitInfo = GameManager.exhibitInfos[exhibitId - 1];
        
        if (exhibitInfo.saleId > 0) {
            StartCoroutine(Http.GetTexture(exhibitId, exhibitInfo.tokenURI, (res) => {
                Texture2D texture = res;
                m_material.mainTexture = texture;
                GameManager.loadCount++;
            }));
            content = exhibitInfo.description;
            exhibitName = exhibitInfo.name;
            year = exhibitInfo.createdAt;
            producer = exhibitInfo.creatorName;
            price = exhibitInfo.price;
        } else {
            StartCoroutine(Http.GetTexture(exhibitId, "https://kgw012-metart-bucket.s3.ap-northeast-2.amazonaws.com/amugeona.png", (res) => {
                Texture2D texture = res;
                m_material.mainTexture = texture;
                GameManager.loadCount++;
            }));
            content = "등록된 작품이 없습니다.";
            exhibitName = exhibitId.ToString();
            year = "";
            producer = "";
            price = 0;
        }
    }
}