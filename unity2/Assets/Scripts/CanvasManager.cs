using System;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class CanvasManager : Singleton<CanvasManager>
{
    public GameObject HelpText;
    public GameObject ExhibitInfo;
    public GameObject GuestBook;
    public GameObject CreateGuestBook;

    public GameObject Canvas;

    public GameObject PrevCommentButton;
    public GameObject NextCommentButton;
    
    //public InputField CommentInputField;
    public TMP_InputField CommentInputField;

    public TMP_Text Content;
    public TMP_Text Username;

    public TMP_Text ExhibitName;
    public TMP_Text ExhibitContent;
    public TMP_Text ExhibitProducer;

    public TMP_Text GameName;
    public TMP_Text GameRank;

    public GameObject VideoCanvas;
    public GameObject InVideo;

    public GameObject GameRankBoard;

    public GameObject GameInfo;
    public TMP_Text GameInfoName;
    public TMP_Text GameInfoContent;
    public TMP_Text GameInfoHelpMessage;
    public long artId;

    void Start()
    {
        HelpText = Canvas.transform.GetChild(0).gameObject;
        // ExhibitInfo = Canvas.transform.GetChild(1).gameObject;
        // GuestBook = Canvas.transform.GetChild(2).gameObject;
        // CreateGuestBook= Canvas.transform.GetChild(3).gameObject;
        // VideoCanvas = Canvas.transform.GetChild(4).gameObject;
        // GameRankBoard = Canvas.transform.GetChild(5).gameObject;
        // GameInfo = Canvas.transform.GetChild(6).gameObject;
    }

    // 도움말 열고 닫기
    public void OpenHelpText() => HelpText.SetActive(true);
    public void CloseHelpText() => HelpText.SetActive(false);
    // 도움말 문구 변경
    public void SetHelpText(string Text)
    {
        Debug.Log(HelpText.GetComponentInChildren<Text>());
        HelpText.GetComponentInChildren<Text>().text = Text;
    }
    // 전시물 정보 설정
    public void SetExhibitInfo(Exhibit exhibit)
    {   
        artId = exhibit.exhibitInfo.artId;
        ExhibitName.text = exhibit.exhibitName;
        ExhibitContent.text = exhibit.content;
        if (exhibit.year.Length < 10) {
            ExhibitProducer.text = $"제작 : {exhibit.producer}\n생성일 : {exhibit.year}";
        } else {
            ExhibitProducer.text = $"제작 : {exhibit.producer}\n생성일 : {exhibit.year.Substring(0, 10)}\n가격 : {((double)exhibit.price)/Math.Pow(10,18)} ETH";
        }
    }
    public void OpenPurchasePage() {
        Application.OpenURL($"https://k6d106.p.ssafy.io/arts/{artId.ToString()}");
    }
    // 전시물 정보 열고 닫기
    public void OpenExhibitContentBoard()
    {
        ExhibitInfo.SetActive(true);
    }
    public void CloseExhibitContentBoard()
    {
        ExhibitInfo.SetActive(false);
    }

    // 게임 정보 설정, 열고 닫기
    internal void SetGameInfo(Exhibit game)
    {
        GameInfoName.text = game.name;
        GameInfoContent.text = game.content;
        GameInfoHelpMessage.text = game.helpmessage;
    }
    internal void OpenGameInfo()
    {
        GameInfo.SetActive(true);
    }

    internal void CloseGameInfo()
    {
        GameInfo.SetActive(false);
    }

    public void CloseExhibitInfo()
    {
        ExhibitInfo.SetActive(false);
    }
    // GuestBook 열고 닫기
    public void OpenGuestBook()
    {
        GuestBook.SetActive(true);
    }

    public void CloseGuestBook()
    {
        GuestBook.SetActive(false);
    }
    // 방명록 작성 보드 열고 닫기
    public void OpenCreateGuestBook()
    {
        CreateGuestBook.SetActive(true);
    }
    public void CloseCreateGuestBook()
    {
        CreateGuestBook.SetActive(false);
    }
    public void SetControllCommentButtons(bool prevState, bool nextState)
    {
        PrevCommentButton.SetActive(prevState);
        NextCommentButton.SetActive(nextState);
    }

    public string GetCommentInputText()
    {
        return CommentInputField.text;
    }
    public void SetCommentInputText(string content)
    {
        CommentInputField.text = content;
    }

    // 방명록 내용 및 유저이름 설정
    public void SetComment(string content, string username)
    {
        Content.text = content;
        Username.text = username;
    }
    // 게임 랭크 보드 On/OFF
    public void OpenGameRankBoard()
    {
        GameRankBoard.SetActive(true);
    }
    public void CloseGameRankBoard()
    {
        GameRankBoard.SetActive(false);
    }

    // 게임 랭크 보드 Text 설정
    public void SetGameRankText(string gamename, string gamerank)
    {
        GameName.text = gamename;
        GameRank.text = gamerank;
    }

    // Video Obj Setting
    public void InVideoObjOn(bool flag)
    {
        CanvasManager.Instance.InVideo.SetActive(flag);
    }
}
