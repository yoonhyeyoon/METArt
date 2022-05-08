using UnityEngine;

public class PlayerManager : MonoBehaviour
{
    private static PlayerManager instance = null;
    public static PlayerManager Instance {
        get {
            if (null == instance) {
                return null;
            }
            return instance;
        }
    }

    public void Awake() {
        if (null == instance) instance = this;
        else Destroy(this.gameObject);
    }

    public GameObject Characters;
    public string CharacterName { get; set; }
    private int index;
    private int first;
    private int last;

    void Start()
    {
        this.index = 0;
        first = 0;
        last = 11;
        CharacterName = GetCharacterName();        
    }

    public void OnClickNextButton() {
        NextCharacter();
    }

    public void OnClickPrevButton() {
        PrevCharacter();
    }

    public void NextCharacter() {
        DeactiveChild();
        if (this.index == last) this.index = first;
        else this.index += 1;
        ActiveChild();
    }

    public void PrevCharacter() {
        DeactiveChild();
        if (this.index == first) this.index = last;
        else this.index -= 1;
        ActiveChild();
    }

    private void ActiveChild() {
        Characters.transform.GetChild(this.index).gameObject.SetActive(true);
    }

    private void DeactiveChild() {
        Characters.transform.GetChild(this.index).gameObject.SetActive(false);
    }

    public string GetCharacterName() {
        return Characters.transform.GetChild(this.index).gameObject.name;
    }
}
