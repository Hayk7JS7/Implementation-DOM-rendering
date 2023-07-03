const TEXT_ELEMENTS = ["h1", "h2", "h3", "h4", "h5", "h6", "p"]
const SEMANTIC_STRUCTURES_ELEMENTS = ["section", "article", "aside", "figure", "figcaption"] 
const SEMANTIC_SECTION_ELEMENTS = ["header", "nav", "main", "footer"]
const TABLE_ELEMENTS = ["table", "tr", "th", "td"]
const LIST_ELEMENTS = ["ul", "ol", "li"]

class DomElement {
    static makeResponsive = []
    constructor(tagName, attributes = {}, children = [], events = {}){
        this.tagName = tagName
        this.events = events
        this.attributes = attributes
        this.children = Array.isArray(children) ? children : [children]
        DomElement.makeResponsive.push(this.tagName)
    }

    addAttributesAndEvents(element) {
        for (const [key, value] of Object.entries(this.attributes)) {
            element.setAttribute(key, value)
        }

        for(const [eventsName, callback] of Object.entries(this.events)) {
            element.addEventListener(eventsName, callback)
            element.style.cursor = "pointer"
        }
    }

    draw() {
        const element = document.createElement(this.tagName)

        this.addAttributesAndEvents(element)

        this.children.forEach((child) => {
            if (child instanceof DomElement) {
                element.appendChild(child.draw())
            } else if (child !== null) {
                element.appendChild(document.createTextNode(child))
            }
        })
        return element
    }
}

class DivElements extends DomElement {
    constructor(attributes, children, events) {
        super("div", attributes, children, events)
    }
    

    draw() {
        const div = document.createElement("div")
        super.addAttributesAndEvents(div)

        this.children.forEach(child => {
            if (child instanceof DomElement) {
                div.appendChild(child.draw())
            } else {
                div.appendChild(document.createTextNode(child))
            }
        })
        return div
    }
}

class SpanElements extends DomElement {
    constructor(attributes, children, events) {
        super("span", attributes, children, events)
    }

    draw() {
        const span = document.createElement("span")
        super.addAttributesAndEvents(span)

        this.children.forEach(child => {
            if(child instanceof DomElement){
                span.appendChild(child.draw())                
            } else {
                span.appendChild(document.createTextNode(child))
            }
        })
        return span
    }
}

class ButtonElement extends DomElement {
    constructor(attributes, children, events) {
        super("button", attributes, children, events)
    }

    draw() {
        const button = document.createElement("button")
        super.addAttributesAndEvents(button)

        this.children.forEach(child => {
            if(child instanceof DomElement) {
                button.appendChild(child.draw())
            } else {
                button.appendChild(document.createTextNode(child))
            }
        })
        return button
    }
}

class HyperlinkElement extends DomElement {
    constructor(attributes, children, events){
        super("a", attributes, children, events)
    }

    draw() {
        const a = document.createElement("a")
        super.addAttributesAndEvents(a)

        this.children.forEach(child => {
            if(child instanceof DomElement) {
                a.appendChild(child.draw())
            } else {
                a.appendChild(document.createTextNode(child))
            }
        })
        return a
    }
}


class InputElements extends DomElement {
    constructor(attributes, children, events) {
        super("input", attributes, children, events)
    }

    draw() {
        const input = document.createElement("input")
        super.addAttributesAndEvents(input)

        return input
    }
}

class TextElements extends DomElement {
    constructor(tagName, attributes, children, events) {
        super(tagName, attributes, children, events)
    }

    draw() {
        const textElement = document.createElement(this.tagName)
        super.addAttributesAndEvents(textElement)

        this.children.forEach(child => {
            if(child instanceof DomElement) {
                textElement.appendChild(child.draw())
            } else {
                textElement.appendChild(document.createTextNode(child))
            }
        })
        return textElement
    }
}

class SemanticStructureElements extends DomElement {
    constructor(tagName, attributes, children, events) {
        super(tagName, attributes, children, events)
    }
    draw() {
        const semanticStructureElement = document.createElement(this.tagName)
        super.addAttributesAndEvents(semanticStructureElement)

        this.children.forEach(child => {
            if(child instanceof DomElement) {
                semanticStructureElement.appendChild(child.draw())
            } else {
                semanticStructureElement.appendChild(document.createTextNode(child))
            }
        })
        return semanticStructureElement
    }
}

class SemanticSectionElements extends DomElement {
    constructor(tagName, attributes, children, events) {
        super(tagName, attributes, children, events)
    }

    draw() {
        const semanticSectionElement = document.createElement(this.tagName)
        super.addAttributesAndEvents(semanticSectionElement)
        
        this.children.forEach(child => {
            if(child instanceof DomElement) { 
                semanticSectionElement.appendChild(child.draw())
            } else {
                semanticSectionElement.appendChild(document.createTextNode(child))
            }
        })
        return semanticSectionElement
    }
    
}

class TableElements extends DomElement {
    constructor(tagName, attributes, children, events) {
        super(tagName, attributes, children, events)
    }

    draw() {
        const tableElement = document.createElement(this.tagName)
        super.addAttributesAndEvents(tableElement)
        
        this.children.forEach(child => {
            if(child instanceof DomElement) { 
                tableElement.appendChild(child.draw())
            } else {
                tableElement.appendChild(document.createTextNode(child))
            }
        })
        return tableElement
    }
}

class ListElements extends DomElement {
    constructor(tagName, attributes, children, events) {
        super(tagName, attributes, children, events)
    }

    draw() {
        const listElement = document.createElement(this.tagName)
        super.addAttributesAndEvents(listElement)
        
        this.children.forEach(child => {
            if(child instanceof DomElement) { 
                listElement.appendChild(child.draw())
            } else {
                listElement.appendChild(document.createTextNode(child))
            }
        })
        return listElement
    }
}



function el(tagName, attributes, children, events) {
    if(typeof tagName !== "string" || Array.isArray(attributes)) return

    const flexibleTagName = tagName.toLowerCase()

    return flexibleTagName === "div"
    ? new DivElements(attributes, children, events) 
    : flexibleTagName === "span" 
    ? new SpanElements(attributes, children, events) 
    : flexibleTagName === "button"
    ? new ButtonElement(attributes, children, events)
    : flexibleTagName === "a"
    ? new HyperlinkElement(attributes, children, events) 
    : flexibleTagName === "input"
    ? new InputElements(attributes, children, events)
    : TEXT_ELEMENTS.includes(flexibleTagName)
    ? new TextElements(flexibleTagName, attributes, children, events)
    : SEMANTIC_STRUCTURES_ELEMENTS.includes(flexibleTagName)
    ? new SemanticStructureElements(flexibleTagName, attributes, children, events)
    : SEMANTIC_SECTION_ELEMENTS.includes(flexibleTagName)
    ? new SemanticSectionElements(flexibleTagName, attributes, children, events)
    : TABLE_ELEMENTS.includes(flexibleTagName)
    ? new TableElements(flexibleTagName, attributes, children, events)
    : LIST_ELEMENTS.includes(flexibleTagName)
    ? new ListElements(flexibleTagName, attributes, children, events)
    : new DomElement(flexibleTagName, attributes, children, events)
}

// 1st case
// const tree =
//     el("div", {"class": "some_classname", "id": "some_id"},
//     el("span", {}, 'hello')
//     );

// 2nd case
    // const tree =
    //   el("div", {},
    //     el("ul", {}, [
    //       el("li", {}, "Item 1"),
    //       el("li", {}, "Item 2"),
    //       el("li", {}, "Item 3")
    //     ])
    //   );

// 3rd case
//     const tree =
//       el("form", {action: 'https://jsonplaceholder.typicode.com/todos/1'}, [
//         el("label", {for: 'name'}, "First name:"),
//         el("br", {}, null),
//         el("input", {type: 'text', id: 'name', name: 'name', value: "My name"}, null),
//         el("br", {}, null),
//         el("label", {for: 'last_name'}, "Last name:"),
//         el("br", {}, null),
//         el("input", {type: 'text', id: 'last_name', name: 'last_name', value: "My second name"}, null),
//         el("br", {}, null),
//         el("input", {type: 'submit', value: 'Submit'}, null),
//       ]);
// document.getElementById("root").appendChild(tree.draw());


// addEventListener case
const tree =
  el("div", 
    {"class": "some_classname", "id": "some_id"}, 
    [
      el("h1", {}, 'hello'),
    ],
    {
      click: () => console.log("Div clicked")
    }
  );
document.getElementById("root").appendChild(tree.draw());

// The addEventListener function isn't functioning correctly, particularly when it comes to handling multiple tasks.