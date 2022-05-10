using System;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class CanvasManager : Singleton<CanvasManager>
{
    public GameObject HelpText;
    public GameObject GalleryInfo;

    public GameObject Canvas;

    public TMP_Text Content;
    public TMP_Text Username;

    public TMP_Text GalleryName;
    public TMP_Text GalleryContent;
    public TMP_Text GalleryProducer;

    void Start()
    {
        HelpText = Canvas.transform.GetChild(0).gameObject;
        GalleryInfo = Canvas.transform.GetChild(1).gameObject;
    }

    public void OpenHelpText() => HelpText.SetActive(true);
    public void CloseHelpText() => HelpText.SetActive(false);

    public void SetHelpText(string Text)
    {
        HelpText.GetComponentInChildren<Text>().text = Text;
    }

    public void SetGalleryInfo(Gallery gallery)
    {
        GalleryName.text = gallery.galleryName;
        GalleryContent.text = gallery.content;
        GalleryProducer.text = $"창작자 : {gallery.producer}\n창작년도 : {gallery.year}";
    }

    public void OpenGalleryContentBoard()
    {
        GalleryInfo.SetActive(true);
    }

    public void CloseGalleryInfo()
    {
        GalleryInfo.SetActive(false);
    }
}
